import { Component} from 'react';
import { Header, Form, FormButton, FormInput } from './Searchbar.styled';
import { ReactComponent as ButtonIcon} from '../../icons/search.svg';
import { toast } from 'react-toastify';

export class Searchbar extends Component {
    state = {
        search: '',
    };

    handleNameChange = event => {
        this.setState({ search: event.currentTarget.value.toLowerCase() });
    };

    handleSubmit = event => {
        event.preventDefault();

        if(this.state.search.trim() === '') {
            return toast.error("You cannot search by empty field. Try again");
        }

        this.props.onSubmit(this.state.search);
        this.setState({ search: '' });
    };

    render() {
        return (
            <Header>
                <Form onSubmit={this.handleSubmit}>
                    <FormButton type="submit">
                        <ButtonIcon aria-label="Search"/>
                    </FormButton>

                    <FormInput
                        name="search"
                        type="text"
                        autocomplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={this.state.search}
                        onChange={this.handleNameChange}
                    />
                </Form>
            </Header>
        )
    }
}
