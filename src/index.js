import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import axios from 'axios';
import {Accordion} from 'react-bootstrap';
import {Panel} from 'react-bootstrap';

class JobList extends React.Component {
    constructor() {
        super();
        this.state = {
            jobs: null
        };
    }

    componentDidMount() {
        axios.get("https://codepen.io/jobs.json")
            .then(response => {
                this.setState({jobs: response.data.jobs});
            })
            .catch((error) => {
                console.log("error", error)
            })
    }

    render() {
        if (this.state.jobs) {
            const jobs = this.state.jobs;
            return (
                <div>
                    <Accordion>
                        {jobs.map(function (job) {
                                return (<Panel header={job["company_name"]} bsStyle="primary">
                                    <pre>{job["description"]}</pre>
                                </Panel>)
                            }
                        )}

                    </Accordion>
                </div>
            );
        }
        else return null
    }
}

// ========================================

ReactDOM.render(<JobList />, document.getElementById("root"));