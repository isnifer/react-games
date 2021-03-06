/** @jsx React.DOM */
;(function (window, React, $, undefined) {

  var mountPoint = document.querySelector('.page');

  var Components = React.createClass({displayName: 'Components',
    getInitialState: function () {
      return {data: []}
    },

    getData: function () {
      $.getJSON(this.props.url)
        .pipe(function (data) {
          this.setState({data: data});
        }.bind(this),
        function (jqhxr, err) {
          console.log(jqhxr, err);
        }.bind(this))
    },

    componentDidMount: function () {
      this.getData();
    },

    render: function () {
      var items = this.state.data.map(function (el, i) {
        return React.DOM.li({className: "components__item"}, React.DOM.a({className: "components__link", href: el.url}, el.title));
      });
      return (
        React.DOM.div({className: "components"}, 
          React.DOM.ul({className: "components__list"}, 
            items
          )
        )
      );
    }
  });

  React.renderComponent(Components({url: "components.json"}), mountPoint);

}(window, window.React, window.jQuery));