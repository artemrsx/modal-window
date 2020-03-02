const modalHtml = `
    <div class="modal-overlay">
        <div class="modal-window">
            <div class="modal-header">
                <span class="model-title">Model Title</span>
                <span class="model-close">&times;</span>
            </div>
            <div class="modal-content">
                <p>Lorem ipsum dolor sit.</p>
                <p>Lorem ipsum dolor sit.</p>
            </div>
            <div class="modal-footer">
                <button>OK</button>
                <button>Cancel</button>
            </div>
        </div>
    </div>
`;

const _createModel = () => {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.insertAdjacentHTML('afterbegin', modalHtml);

  document.body.appendChild(modal);
  return modal;
};

$.modal = options => {
  const ANIMATION_SPEED = 200;
  const $modal = _createModel();
  let closing = false;

  return {
    open: () => {
      !closing && $modal.classList.add('open');
    },
    close: () => {
      closing = true;
      $modal.classList.remove('open');
      $modal.classList.add('hide');

      setTimeout(() => {
        $modal.classList.remove('hide');
        closing = false;
      }, ANIMATION_SPEED);
    },
    destroy: () => {}
  };
};
