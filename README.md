# Confirm JS

This Plugin was made to replace the native confirm box for every browser 'cause they look crappy. Now this plugin is much more than a simple confirm box. Define content, add forms or load content lazy or eager with ajax. Add more buttons or customize the defaults. Everyone can has his own callback and content. Load the box for an element or simply with $.confirm(). You can style it like you need it.

You also can use it as message to your visitor after an action like an ajax call.

## Options

- template: null,
- title: 'Are you sure?',
- content: 'Please press OK to confirm and run, or Abort to abort this action.',
- button_accept: 'OK',
- button_abort: 'Abort',
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
			<td>Wird als H2-Element im Modal ausgegeben.</td>
		</tr>
		<tr>
			<td>content: ''</td>
			<td>Modal-Inhalt</td>
			<td>Wird als Frage unter der Headline ausgegeben.</td>
		</tr>
		<tr>
			<td>accept: function(){}</td>
			<td>Accept-Event</td>
			<td>Wird ausgeführt wenn der User auf den OK-Button klickt.</td>
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
