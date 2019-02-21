import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import query from '../queries/fetchSongs';

class SongCreate extends React.Component {

    constructor(props) {

        super(props);

        this.state = { title: '' };
    }

    onSubmit(e) {

        e.preventDefault();

        this.props.mutate({
            variables: { title: this.state.title },
            refetchQueries: [{ query }]
        }).then(() => hashHistory.push('/') );
    }

    render() {

        console.log(this.props);

        return (
            <div>
                <h3>create a new song</h3>
                <form onSubmit = { this.onSubmit.bind(this) }>
                    <label>Song Title:</label>
                    <input 
                     onChange = { event => this.setState({ title: event.target.value })}
                     value = { this.state.title }
                    />
                </form>
            </div>
        );
    }
}

const mutation = gql`
    mutation AddSong($title: String) {
        addSong(title: $title) {
            title
        }
    }
`;

export default graphql(mutation)(SongCreate);