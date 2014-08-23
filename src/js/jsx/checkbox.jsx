/**
 * @jsx React.DOM
 */
;(function (window, document, React, $, undefined) {

  var CustomCheckbox = React.createClass({
    getInitialState: function () {
      return {
        name: '',        
        isChecked: false
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
      var checkbox = this.props.checkbox,
          checked = checkbox.checked,
          name = checkbox.name;

      this.setState({
        isChecked: checked,
        name: name
      });
    },
    componentDidMount: function () {
      // Load data via AJAX
      // this.getData();

      // Wrap select from DOM
      this.wrapSelect();
    },
    onFocus: function (e) {
      // TODO: Bind space key
    },
    onChange: function () {
      this.setState({'isChecked': !this.state.isChecked});
    },
    onClick: function () {
      this.setState({'isChecked': !this.state.isChecked});
    },
    render: function () {
      return (
        <div className={this.state.isChecked ? 'react-checkbox react-checkbox_checked' : 'react-checkbox'} tabIndex={Date.now()} onClick={this.onClick} onFocus={this.onFocus}>
          <i className="react-checkbox__icon"></i>
          <input className="react-checkbox__field" type="checkbox" ref="select" checked={this.state.isChecked} onChange={this.onChange} name={this.state.name || 'checkbox' + this.props.key} />
        </div>
      );
    }
  });

  var checkbox = document.querySelectorAll('.form__checkbox');
  checkbox = [].slice.call(checkbox);

  checkbox.map(function (el, i) {
    React.renderComponent(<CustomCheckbox checkbox={el} key={i} />, el.parentNode);
  });

}(window, window.document, window.React, window.jQuery));