import React from 'react';
import GetLogout from "../../request/User/Logout";


export default class Logout extends React.Component {

    componentWillMount() {
        GetLogout()
            .then(response => {
                const { status = 500 } = response;
                if (status === 200)
                    setInterval(window.location.href = "/", 8000);
            })
            .catch(error => console.error(error));
    }

    render() {
        return (
            <div>
                <p>
                    Logout...
                </p>
            </div>
        )
    }
}