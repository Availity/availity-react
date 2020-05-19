import React from 'react';
import { Link, Route, Router, Switch, withRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { BreadcrumbItem } from 'reactstrap';
import Breadcrumbs from '../index';

const StartPage = () => (
  <div>
    Start page content
    <Breadcrumbs active="react-router-demo-page">
      <BreadcrumbItem>
        <Link to="react-router-destination">React Router Breadcrumb</Link>
      </BreadcrumbItem>
    </Breadcrumbs>
  </div>
);

const ReactRouterDestination = () => <div>parent page of start page</div>;
const NoMatch = () => <div>No match</div>;

const LocationDisplay = withRouter(({ location }) => (
  <div data-testid="location-display">{location.pathname}</div>
));

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/start" component={StartPage} />
        <Route
          path="/react-router-destination"
          component={ReactRouterDestination}
        />
        <Route component={NoMatch} />
      </Switch>
      <LocationDisplay />
    </div>
  );
}

afterEach(cleanup);

function renderWithRouter(
  ui,
  {
    route = '/start',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  };
}

test('full app rendering/navigating', () => {
  const { container, getByText } = renderWithRouter(<App />);
  expect(container.innerHTML).toMatch('Start page content');
  const leftClick = { button: 0 };
  fireEvent.click(getByText(/React Router Breadcrumb/i), leftClick);
  expect(container.innerHTML).toMatch('parent page of start page');
});

test('landing on a bad page', () => {
  const { container } = renderWithRouter(<App />, {
    route: '/something-that-does-not-match',
  });
  expect(container.innerHTML).toMatch('No match');
});

test('rendering a component that uses a single breadcrumb', () => {
  const route = '/some-route';
  const { getByTestId } = renderWithRouter(<LocationDisplay />, { route });
  expect(getByTestId('location-display').textContent).toBe(route);
});

const StartPageMultiBreadcrumbItems = () => (
  <div>
    Start page content
    <Breadcrumbs active="react-router-demo-page">
      <BreadcrumbItem>
        <a href="/static/link">Static Breadcrumb</a>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Link to="react-router-destination">React Router Breadcrumb</Link>
      </BreadcrumbItem>
    </Breadcrumbs>
  </div>
);

function AppMultiBreadcrumb() {
  return (
    <div>
      <Switch>
        <Route exact path="/start" component={StartPageMultiBreadcrumbItems} />
        <Route
          path="/react-router-destination"
          component={ReactRouterDestination}
        />
        <Route component={NoMatch} />
      </Switch>
      <LocationDisplay />
    </div>
  );
}

test('full app rendering with multiple breadcrumbs', () => {
  const { container, getByText } = renderWithRouter(<AppMultiBreadcrumb />);
  expect(container.innerHTML).toMatch('Start page content');
  const leftClick = { button: 0 };
  fireEvent.click(getByText(/React Router Breadcrumb/i), leftClick);
  // normally I'd use a data-testid, but just wanted to show this is also possible
  expect(container.innerHTML).toMatch('parent page of start page');
});

const StartPageNoBreadcrumbItems = () => (
  <div>
    Start page content
    <Breadcrumbs active="react-router-demo-page" />
  </div>
);

function AppNoBreadcrumbItems() {
  return (
    <div>
      <Switch>
        <Route exact path="/start" component={StartPageNoBreadcrumbItems} />
        <Route component={NoMatch} />
      </Switch>
      <LocationDisplay />
    </div>
  );
}

test('full app rendering with no breadcrumbitems', () => {
  const { container } = renderWithRouter(<AppNoBreadcrumbItems />);
  expect(container.innerHTML).toMatch('Start page content');
});
