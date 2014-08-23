/**
 * @jsx React.DOM
 */
;(function (window, document, React, $, undefined) {

  var mountPoint = document.querySelector('.page');

  var SelectList = React.createClass({
    render: function () {
      var selects = [1,2].map(function (el, i) {
        return <CustomSelect />;
      });
      return (
        <form className="form">
          {selects}
        </form>
      );
    }
  });

  var CustomSelect = React.createClass({
    getInitialState: function () {
      return {
        options: [],
        current: {value: '', title: '', selectedIndex: 0, selectedOptions: ''},
        isOpen: false
      }
    },
    getData: function () {
      $.getJSON('data.json')
        .pipe(function (data) {
          this.setState({options: data});
          this.setState({current: data[0]});
        }.bind(this),
        function (jqxhr, err) {
          console.log(jqxhr, err);
        }.bind(this));
    },
    componentDidMount: function () {
      this.getData();
    },
    onFocus: function (e) {
      // TODO: Bind arrow keys
    },
    onBlur: function () {
      this.setState({'isOpen': false});      
    },
    onTitleClick: function () {
      this.setState({'isOpen': true});
    },
    onOptionClick: function (options) {
      var select = this.refs.select.getDOMNode(),
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
      select.selectedIndex = options.selectedIndex;
      select.value = options.value;
    },
    render: function () {
      var _this = this;
      var customOptions = this.state.options.map(function (option, i) {
        return <CustomOptions title={option.title} key={i} value={option.value} onClick={_this.onOptionClick} />;
      });
      return (
        <div className="form__select" ref="select" tabIndex={Date.now()} onFocus={this.onFocus} onBlur={this.onBlur}>
          <div className="form__select-title g-clf" onClick={this.onTitleClick}>
            <i className="fa fa-caret-down"></i><span className="form__select-title-text">{this.state.current.title}</span> 
          </div>
          <div className={this.state.isOpen ? 'form__select-options form__select-options_state_visible' : 'form__select-options'} ref="options"> 
            {customOptions}
          </div>
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
        <div className="form__select-option" data-value={this.props.value} onClick={this.onClick}>{this.props.title}</div>
      );
    }
  });  

  React.renderComponent(<SelectList />, mountPoint);

}(window, window.document, window.React, window.jQuery));