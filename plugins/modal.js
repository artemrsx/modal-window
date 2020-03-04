Element.prototype.appendAfter = function(element) {
  element.parentNode.insertBefore(this, element.nextSabling);
};

const _createFooter = (btns = []) => {
  if (btns.length === 0) {
    return document.createElement('div');
  }

  const wrap = document.createElement('div');
  wrap.classList.add('modal-footer');

  btns.forEach(btn => {
    const $btn = document.createElement('button');
    $btn.textContent = btn.text;
    $btn.classList.add('btn');
    $btn.classList.add(`btn-${btn.type || 'secondary'}`);
    $btn.onclick = btn.handler || function() {};

    wrap.appendChild($btn);
  });

  return wrap;
};

const _createModel = options => {
  const DEFAULT_WIDTH = '600px';
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.insertAdjacentHTML(
    'afterbegin',
    `
    <div class="modal-overlay" data-close="true">
        <div class="modal-window" style="width: ${options.width ||
          DEFAULT_WIDTH}">
            <div class="modal-header">
                <span class="model-title">${options.title ||
                  'Default title'}</span>
                ${options.closable &&
                  '<span data-close="true" class="model-close">&times;</span>'}
            </div>
            <div class="modal-content" data-content>
                ${options.content || ''}
            </div>
        </div>
    </div>
  `
  );

  const footer = _createFooter(options.footerButtons);
  footer.appendAfter(modal.querySelector('[data-content]'));

  document.body.appendChild(modal);
  return modal;
};

$.modal = options => {
  const ANIMATION_SPEED = 200;
  const $modal = _createModel(options);
  let closing = false;
  let destroyed = false;

  const modalObj = {
    open: () => {
      !closing && !destroyed && $modal.classList.add('open');
    },
    close: () => {
      closing = true;
      $modal.classList.remove('open');
      $modal.classList.add('hide');

      setTimeout(() => {
        $modal.classList.remove('hide');
        closing = false;
      }, ANIMATION_SPEED);
    }
  };

  const closeListener = event => {
    if (event.target.dataset.close) {
      modalObj.close();
    }
  };

  $modal.addEventListener('click', closeListener);

  return {
    ...modalObj,
    destroy: () => {
      $modal.parentNode.removeChild($modal);
      $modal.removeEventListener(closeListener);
      destroyed = true;
    },
    setContent: html => {
      $modal.querySelector('[data-content]').innerHTML = html;
    }
  };
};
