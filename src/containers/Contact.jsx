import React,{ Component } from 'react';
import {Helmet} from 'react-helmet';

import '../sass/main/contact.scss'

class Contact extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      status: ""
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  submitForm(ev) {
    ev.preventDefault();
    const form = ev.target;
    const data = new FormData(form);
    const xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
      if (xhr.status === 200) {
        form.reset();
        this.setState({ status: "SUCCESS" });
      } else {
        this.setState({ status: "ERROR" });
      }
    };
    xhr.send(data);
  }

  render(){
    return (
      <div className="contact-form">
        <Helmet>
          <title>kefuno_edit お問い合わせ</title>
        </Helmet>
        <h2 className="title">Contact</h2>
        <p>ご質問ありましたらこちらにお願い致します。</p>
        <form 
          onSubmit={this.submitForm}
          action="https://formspree.io/f/mjvpjyww"
          method="POST"
        >
          <p>お名前</p>
          <input type='text' name='お名前' placeholder="佐藤　太郎" />
          <p>メールアドレス</p>
          <input type="email" name="返信先" placeholder="you@example.com"/>
            <p>件名</p>
            <input type='text' name='件名' />
          <p>お問い合わせ内容</p>
          <textarea name='お問い合わせ内容'></textarea>
          <input className='submit' type="submit" value='Send'/>
        </form>
      </div>
    )
  }
}

export default Contact