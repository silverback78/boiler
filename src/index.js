'use strict';

require('./boiler/boiler.config.js');

const importAll = (r) => {
  return r.keys().map(r);
};

/* Core */
require('./polyfills/utils.js');
require('./boiler/boiler.js');
require('./boiler/routes.js');
require('./boiler/theme.js');

/* Services */
require('./services/api.service.js');
require('./services/go.service.js');
require('./services/log.service.js');
require('./services/spinner.service.js');
require('./services/stash.service.js');

/* Directives */
require('./directives/submit.directive.js');
require('./directives/tab.directive.js');

/* Filters */
require('./filters/add-dashes.filter.js');
require('./filters/remove-dashes.filter.js');

/* Images */
importAll(require.context('./images/', false, /\.(png|jpe?g|svg)$/));
require('../favicon.ico');

/* Styles */
require('./boiler/styles.css');

/* Views */
require('./views/users/users.view.controller.js');
require('./views/users/users.view.template.html');
require('./views/users/users.view.styles.css');

require('./views/home/home.view.controller.js');
require('./views/home/home.view.template.html');
require('./views/home/home.view.styles.css');

require('./views/how-it-works/how-it-works.view.controller.js');
require('./views/how-it-works/how-it-works.view.template.html');
require('./views/how-it-works/how-it-works.view.styles.css');

require('./views/demo/demo.view.controller.js');
require('./views/demo/demo.view.template.html');
require('./views/demo/demo.view.styles.css');

require('./views/recent/recent.view.controller.js');
require('./views/recent/recent.view.template.html');

require('./views/study-widgets/study-widgets.view.controller.js');
require('./views/study-widgets/study-widgets.view.template.html');
require('./views/study-widgets/study-widgets.view.styles.css');

/* Components */

require('./components/container/container.directive.js');
require('./components/container/container.controller.js');
require('./components/container/container.template.html');
require('./components/container/container.styles.css');

require('./components/decks/create-deck/create-deck.directive.js');
require('./components/decks/create-deck/create-deck.controller.js');
require('./components/decks/create-deck/create-deck.service.js');
require('./components/decks/create-deck/create-deck.template.html');
require('./components/decks/create-deck/create-deck.styles.css');

require('./components/dialog/dialog.directive.js');
require('./components/dialog/dialog.controller.js');
require('./components/dialog/dialog.template.html');

require('./components/navigation/navigation.directive.js');
require('./components/navigation/navigation.controller.js');
require('./components/navigation/navigation.template.html');
require('./components/navigation/navigation.styles.css');

require('./components/page-header/page-header.directive.js');
require('./components/page-header/page-header.controller.js');
require('./components/page-header/page-header.template.html');
require('./components/page-header/page-header.styles.css');

require('./components/pager/pager.directive.js');
require('./components/pager/pager.controller.js');
require('./components/pager/pager.template.html');
require('./components/pager/pager.styles.css');

require('./components/recaptcha/recaptcha.service.js');
require('./components/recaptcha/recaptcha.controller.js');
require('./components/recaptcha/recaptcha.directive.js');
require('./components/recaptcha/recaptcha.template.html');

require('./components/sequencer/sequencer.directive.js');
require('./components/sequencer/sequencer.controller.js');
require('./components/sequencer/sequencer.template.html');
require('./components/sequencer/sequencer.styles.css');
require('./components/sequencer/sequencer-step/sequencer-step.directive.js');
require('./components/sequencer/sequencer-step/sequencer-step.template.html');

require('./components/study-widgets/studyWidgetBase.controller.js');
require('./components/study-widgets/study-widget-progress-bar.directive.js');
require('./components/study-widgets/study-widgets.styles.css');

require('./components/study-widgets/card-list/card-list.directive.js');
require('./components/study-widgets/card-list/card-list.controller.js');
require('./components/study-widgets/card-list/card-list.template.html');
require('./components/study-widgets/card-list/card-list.styles.css');

require('./components/study-widgets/flashcards/flashcards.directive.js');
require('./components/study-widgets/flashcards/flashcards.controller.js');
require('./components/study-widgets/flashcards/flashcards.template.html');
require('./components/study-widgets/flashcards/flashcards.styles.css');

require('./components/study-widgets/multiple-choice/multiple-choice.directive.js');
require('./components/study-widgets/multiple-choice/multiple-choice.controller.js');
require('./components/study-widgets/multiple-choice/multiple-choice.template.html');
require('./components/study-widgets/multiple-choice/multiple-choice.styles.css');

require('./components/study-widgets/select-widget/select-widget.directive.js');
require('./components/study-widgets/select-widget/select-widget.controller.js');
require('./components/study-widgets/select-widget/select-widget.template.html');
require('./components/study-widgets/select-widget/select-widget.styles.css');

require('./components/toast/toast.directive.js');
require('./components/toast/toast.controller.js');
require('./components/toast/toast.styles.css');

require('./components/users/authentication.service.js');

require('./components/users/create-user/create-user.directive.js');
require('./components/users/create-user/create-user.controller.js');
require('./components/users/create-user/create-user.template.html');
require('./components/users/create-user/create-user.styles.css');

require('./components/users/login/login.directive.js');
require('./components/users/login/login.controller.js');
require('./components/users/login/login.template.html');
require('./components/users/login/login.styles.css');

require('./components/users/user.service.js');
