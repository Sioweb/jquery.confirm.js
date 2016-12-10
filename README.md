# Confirm JS

This Plugin was made to replace the native confirm box for every browser 'cause they look crappy. Now this plugin is much more than a simple confirm box. Define content, add forms or load content lazy or eager with ajax. Add more buttons or customize the defaults. Everyone can has his own callback and content. Load the box for an element or simply with $.confirm(). You can style it like you need it.

You also can use it as message to your visitor after an action like an ajax call and autoclose the box after some time. Or if you need a whole form in your box, simply combine it with my [FormCreator here on Github](https://github.com/Sioweb/jquery.createForm.js).

## Options

- template: null,
- title: 'Are you sure?',
- content: 'Please press OK to confirm and run, or Abort to abort this action.',
- button_accept: 'OK',
- button_abort: 'Abort',
- hideAfter: 1500,
- custom_buttons: {},
- on: 'click',
- button_pressed: function(){},
- close: function(){},
- defaultAction: function(){},
- accept: function(){},
- abort: function(){},

<table width="100%">
	<thead>
		<tr>
			<th>Option</th><th>Werte</th><th>Beschreibung</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>on: 'click'</td>
			<td>(string)Event-Name</td>
			<td>'click','hover', ...</td>
		</tr>
		<tr>
			<td>title: ''</td>
			<td>Modal-Headline</td>
			<td>H2 element in modal.</td>
		</tr>
		<tr>
			<td>content: ''</td>
			<td>Modal content</td>
			<td>Notice in the modal.</td>
		</tr>
		<tr>
			<td>accept: function(){}</td>
			<td>Accept event</td>
			<td>Fired when clicking accept.</td>
		</tr>
		<tr>
			<td>abort: function(){}</td>
			<td>Abort event</td>
			<td>Fired when clicking abort.</td>
		</tr>
		<tr>
			<td>hideAfter: integer</td>
			<td>Integer</td>
			<td>Time in seconds after the modal will close automatically.</td>
		</tr>
	</tbody>
</table>
 
## Examples

### Default use

```
$('.removeButton').confirm({
 on: 'click',
 accept: function(obj) {
  alert('Aktion akzeptiert!');
 },
 abort: function() {
  alert('Aktion abgebrochen!');
 }
});
```

### Without element

The box will load every time the browser fires your event. The plugin will reload the content every time, so this should only be used if you don't need to load tonns of content. For example use it to tell your visitor that the action was successfull after after some ajax.

```
$('selector').on('EVENT',function() {
  $.confirm({
    // options here
  });
});
```

### Custom buttons

```
$('.removeButton').confirm({
  custom_buttons: {
    do_something_cool: {
      title: 'Click here',
      link: 'link/to/path',
      target: '_blank',
      keep_modal: 1,
      callback: function(element, buttonSettings, confirmObject) {
      	// do something cool on click
      }
    }
  }
});
```

### Ajax

Its recommended to load content eager if you wont define the plugin to an element. The content will be loaded to the box.

```
$.confirm({
  url: 'your_code.php',
  ajaxOptions: {
    method: 'POST',
    data: {
      foo: 'bar',
      x: 2
    }
  },
  ajaxSuccess: function(confirmObj,content) {
    // do something
  }
});
``` 
