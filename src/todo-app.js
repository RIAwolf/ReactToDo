'use strict';

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {items: [], text: ''};
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
        const newItem = {
            text: this.state.text,
            id: Date.now()
        };
        this.setState(state => ({
            items: state.items.concat(newItem), // a=a+"naujas"
            text: ''
        }));
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

