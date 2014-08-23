/**
 * @jsx React.DOM
 */
;(function (window, document, React, $, undefined) {

  var CustomSelect = React.createClass({
    getInitialState: function () {
      return {
        options: [],
        name: '',
        current: {value: '', title: '', selectedIndex: 0, selectedOptions: []},
        isOpen: false
      }
    },
    getData: function () {
      $.getJSON('data.json')
        .pipe(function (data) {
          this.setState({
            options: data,
            current: data[0]
          });
        }.bind(this),
        function (jqxhr, err) {
          console.log(jqxhr, err);
        }.bind(this));
    },
    wrapSelect: function () {
      var select = this.props.select,
          name = select.name,
          options = [].slice.call(select.options),
          selectedIndex = select.options.selectedIndex,
          data;

      data = options.map(function (el, i) {
        return {title: el.textContent, value: el.value};
      }); 

      this.setState({
        options: data,
        name: name,
        current: {
          value: data[selectedIndex].value,
          title: data[selectedIndex].title,
          selectedIndex: selectedIndex
        }
      });
    },
    componentDidMount: function () {
      // Load data via AJAX
      // this.getData();

      // Wrap select from DOM
      this.wrapSelect();
    },
    onFocus: function (e) {
      // TODO: Bind arrow keys
    },
    onBlur: function () {
      this.setState({'isOpen': false});      
    },
    onTitleClick: function () {
      this.setState({'isOpen': !this.state.isOpen});
    },
    onOptionClick: function (options) {
      var select = this.refs.customSelect.getDOMNode(),
          children = this.refs.options.getDOMNode().children;
      
      this.setState({
        current: {
          title: options.title,
          value: options.value,
          selectedIndex: options.selectedIndex,
          selectedOptions: options.selectedOptions
        },
        'isOpen': false
      });

      select.options = children;
      select.selectedOptions = options.selectedOptions;
      select.selectedIndex = this.refs.select.getDOMNode().selectedIndex = options.selectedIndex;
      select.value = options.value;
    },
    render: function () {
      var _this = this;
      var options = this.state.options.map(function (option, i) {
        return <option value={option.value}>{option.title}</option>;
      });
      var customOptions = this.state.options.map(function (option, i) {
        return <CustomOptions title={option.title} key={i} value={option.value} onClick={_this.onOptionClick} />;
      });
      return (
        <div className={'react-select' + ' react-select_' + Date.now()} ref="customSelect" tabIndex={Date.now()} onFocus={this.onFocus} onBlur={this.onBlur}>
          <div className="react-select__title g-clf" onClick={this.onTitleClick}>
            <div className="react-select__arrow">
              <i className="react-select__caret"></i>
            </div>
            <span className="react-select__title-text">{this.state.current.title}</span> 
          </div>
          <div className={this.state.isOpen ? 'react-select__options react-select__options_state_visible' : 'react-select__options'} ref="options"> 
            {customOptions}
          </div>
          <select className="react-select__select" ref="select" value={this.state.current.value} name={this.state.name || 'select' + this.props.key}>{options}</select>
        </div>
      );
    }
  });

  var CustomOptions = React.createClass({
    onClick: function (mouseEvent) {

      // Callback from Parent Node
      // Send values from JS. Prevent changes from clientside. 
      this.props.onClick({
        selectedIndex: this.props.key,
        selectedOptions: [this.getDOMNode()],
        title: this.props.title,
        value: this.props.value
      });
    },
    render: function () {
      return (
        <div className="react-select__option" onClick={this.onClick}>{this.props.title}</div>
      );
    }
  });  

  var select = document.querySelectorAll('.form__select');
  select = [].slice.call(select);

  select.map(function (el, i) {
    React.renderComponent(<CustomSelect select={el} key={i} />, el.parentNode);
  });

}(window, window.document, window.React, window.jQuery));