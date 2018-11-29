'use strict';

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        var temp = window.data.slice();
        this.state = {items: temp, text: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h3",
                null,
                "TODO"
            ),
            React.createElement(TodoList, {
                items: this.state.items,
                deleteItem: this.handleDelete.bind(this)
            }),
            React.createElement(
                "form",
                {onSubmit: this.handleSubmit},
                React.createElement(
                    "label",
                    {htmlFor: "new-todo"},
                    "What needs to be done?"
                ),
                React.createElement("input", {
                    id: "new-todo",
                    onChange: this.handleChange,
                    value: this.state.text
                }),
                React.createElement(
                    "button",
                    null,
                    "Add #",
                    this.state.items.length + 1
                )
            )
        );
    }

    handleChange(e) {
        this.setState({text: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.text.length) {
            return;
        }
        debugger;
        $.ajax({
            type: 'POST',
            url: 'http://192.168.3.107:8080/item',
            crossDomain: true,
            dataType: 'json',
            data: {
                title: this.state.text,
                done: 0,
                user: "Overlord"
            },

            error: function (data) {
                console.log(data);
            },
        }).done((data) => {
            debugger;
            this.setState(state => ({
                items: data,
                text: ''
            }));
        });

        const newItem = {
            title: this.state.text,
            done: 0,
            user: "Overlord"
        };


    }

    handleDelete(item) {
        var items = this.state.items;
        var index = items.indexOf(item);
        items.splice(index, 1);
        this.state.items = items;
        this.setState(state => ({
            items: state.items
        }));
    }
}

