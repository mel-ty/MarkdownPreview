import React from 'react';
import {marked} from 'marked';
import './App.css';

marked.setOptions({
  breaks: true,
  gfm: true
});

const markedLink = new marked.Renderer();
markedLink.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorText: placeholder,
      colorScheme: 'lavender',
      menu: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.editorMenuClear = this.editorMenuClear.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }
handleChange(event) {
  this.setState({
    editorText: event.target.value
  })
};
editorMenuClear() {
  this.setState({
    editorText: "`//Ok, one more time`"
  })
};
 handleClick(event) {
    this.setState({
      colorScheme: event.target.value
    })
  }
  toggleMenu() {
    this.setState({
      menu: !this.state.menu
    })
  }
  render() {
    const themes = {
      lavender: ['#DBF4A7', '#12130F', '#F9F9ED', '#7D84B2', '#D9DBF1', '#8E9DCC'],
      orangeChocolate: ['#246A51', '#FF8600', '#191102', '#78290F', '#0F084B', '#1E2019'],
      strawberrySoda: ['#04B5A3', '#12130F', '#F7C1C6', '#C43140', '#B4CCCA', '#2A968D']
    }

    return(
      <div className='container'>
        <style>
          {`
          :root {
            --body-color: ${themes[this.state.colorScheme][0]};
            --text: ${themes[this.state.colorScheme][1]};
            --component-background: ${themes[this.state.colorScheme][2]};
            --component-dark-accent: ${themes[this.state.colorScheme][3]};
            --code-background: ${themes[this.state.colorScheme][4]};
            --table-accent: ${themes[this.state.colorScheme][5]};
            --rem-20: 125%;
            --rem-16: 100%;
          }
          `}
        </style>
        <PageMenu onClick={this.handleClick} toggleMenu={this.toggleMenu} menu={this.state.menu}/>
        <div className='box' id="top">
          <EditorMenu onClick={this.editorMenuClear}/>
          <Editor text={this.state.editorText} onChange={this.handleChange}/>
        </div>
        <div className='box'>
        <h2>/Preview</h2>
          <Preview text={this.state.editorText}/>
        </div>
      </div>
    )
  }
  
};

const PageMenu = (props) => {
  const iconColor = {color: 'var(--text)'}
  return(
    <div className='page-menu'>
      <button id='menu-up'><a href="#top" id="link-up">&uArr;</a></button>
      <button id='menu-icon' onClick={props.toggleMenu} style={props.menu ? iconColor : null}>&#9998;</button>
      <div id='menu-options' className={props.menu ? 'menu-options-on' : 'menu-options-off'}>
        <p id="menu-text">Pick a color theme:</p>
        <label>
          <input  type='radio' name='color-theme' id='theme1' value='lavender' onClick={props.onClick} defaultChecked/>
          Lavender
          </label>
        <label>
          <input  type='radio' name='color-theme' id='theme2' value='orangeChocolate' onClick={props.onClick} />
          Orange chocolate
          </label>
        <label>
          <input  type='radio' name='color-theme' id='theme3' value='strawberrySoda' onClick={props.onClick} />
          Strawberry soda
          </label> 
          </div>
      </div>
  )
}


const EditorMenu = (props) => {
  return(
    <div className='header-box'>
      <h2 className='header-editor'>/Editor</h2>
      <button onClick={props.onClick}>Clear editor</button>
    </div>
  )
}

const Editor = (props) => {
  return(
    <textarea 
    id='editor'
    className='textarea' 
    value={props.text}
    onChange={props.onChange}
    type='text'
    />
  )
};

const Preview = (props) => {
  return(
  <div id ='preview'
    className='preview-text'
    dangerouslySetInnerHTML={{
        __html: marked.parse(props.text, {renderer: markedLink})
      }}
    />
  )
}


const placeholder = `# Welcome to my Markdown Previewer!

## This is a sub-heading
### And here's some other cool stuff:

Write code between 2 backticks: \`<div></div>\`, or

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold** or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes! 
> **Tip**: have you tried menu buttons in the top left corner?

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)

> [Used as reference](https://codepen.io/freeCodeCamp/pen/GrZVVO?editors=0010)
`;

export default MyApp;