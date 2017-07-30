import { ShoppingAppPage } from './app.po';

describe('shopping-app App', () => {
  let page: ShoppingAppPage;

  beforeEach(() => {
    page = new ShoppingAppPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
