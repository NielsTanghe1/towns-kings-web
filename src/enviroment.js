import {
    Environment,
    Network,
    RecordSource,
    Store,
} from 'relay-runtime';

function fetchQuery(
    operation,
    variables,
) {
    return fetch('/api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5ZXIiOnt9LCJpYXQiOjE2MTA3MTU0MzN9.7U1Xwb-6mz1fi3mcC_63ch_-FtMiILUE_MnqQQgMF2M'
        },
        body: JSON.stringify({
            query: operation.text,
            variables,
        }),
    }).then(response => {
        return response.json();
    });
}

const environment = new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
});

export default environment;