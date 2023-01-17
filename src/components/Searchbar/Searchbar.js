import { useState} from 'react';
import { Header, Form, FormButton, FormInput } from './Searchbar.styled';
import { ReactComponent as ButtonIcon} from '../../icons/search.svg';
import { toast } from 'react-toastify';

export function Searchbar({ onSubmit })  {
    const [search, setSearch] = useState('')
    

    const handleNameChange = event => {
        setSearch(event.currentTarget.value.toLowerCase());
    };

    const handleSubmit = event => {
        event.preventDefault();

        if(search.trim() === '') {
            return toast.error("You cannot search by empty field. Try again");
        }

        onSubmit(search);
        setSearch('');
    };
        return (
            <Header>
                <Form onSubmit={handleSubmit}>
                    <FormButton type="submit">
                        <ButtonIcon aria-label="Search"/>
                    </FormButton>

                    <FormInput
                        name="search"
                        type="text"
                        autocomplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={search}
                        onChange={handleNameChange}
                    />
                </Form>
            </Header>
        )
}
