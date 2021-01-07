import {createBrowserHistory} from "history";

function appendBaseName (basename, to, state, callback)  {
    if (typeof to === 'string') {
        to = basename + to;
    }
    if (typeof to === 'object' && to.pathname) {
        to.pathname = basename + to.pathname;
    }
    if (state !== undefined && state.pathname) {
        to.pathname = basename + state.pathname;
    }

    return callback(to, state);
}

function createBrowserHistoryWithBasename(basename = '/') {
    let history = createBrowserHistory({
      basename: basename
    });
    history.basename = basename;

    const push = history.push;
    const replace = history.replace;
    history.push = (to, state = undefined) => appendBaseName(basename, to, state, push);
    history.replace = (to, state = undefined) => appendBaseName(basename, to, state, replace);

    return history;
};

export default createBrowserHistoryWithBasename