import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    }

    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field
                    name="title"
                    component={this.renderInput}
                    label="Enter Title"
                />
                <Field
                    name="description"
                    component={this.renderInput} l
                    abel="Enter Dispriction"
                />

                <button className="ui button primary">Submit</button>
            </form>
        )
    }
}


// 未入力の場合のエラー処理
const validate = (formValues) => {
    // エラーの配列作成
    const errors = {};

    // タイトルのエラー
    if (!formValues.title) {
        errors.title = 'You must enter a title.'
    }

    // 説明のエラー
    if (!formValues.description) {
        errors.description = "You must enter a description."
    }

    // エラーの配列を返す
    return errors;
}

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);
