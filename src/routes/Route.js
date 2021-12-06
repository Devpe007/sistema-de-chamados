import { Route, To } from 'react-router-dom';

function RouteWrapper({
    component: Component,
    isPrived,
    ...rest
}) {
    const loading = false;
    const signed = false;

    if(loading) {
        return (
            <div></div>
        );
    };

    if(!signed && isPrived) {
        return <To to="/" />
    };

    if(signed && !isPrived) {
        return <To to="/dashboard" />
    };

    return (
        <Route 
            {...rest}
            render={props => (
                <Component {...props} />
            )}
        />
    );
};

export default RouteWrapper;