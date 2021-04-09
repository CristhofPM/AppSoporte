import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { AppModule } from './app'
import { ticketTemplateModule } from './templates'
import { TicketModule } from './tickets'
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  app: AppModule,
  form: ticketTemplateModule,
  ticket: TicketModule
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
}


