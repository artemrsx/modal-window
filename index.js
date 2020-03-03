const myModal = $.modal({
  title: 'My Model',
  closable: true,
  content: `
    <p>modal is working</p>
    <p>modal is working2</p>
    `,
  width: '400px',
  footerButtons: [
    {
      text: 'OK',
      type: 'primary',
      handler: () => {
        console.log(`CLICKED ${this.text}`);
      }
    },
    {
      text: 'CANCEL',
      type: 'danger',
      handler: () => {
        console.log(`CLICKED ${this.text}`);
      }
    }
  ]
});
