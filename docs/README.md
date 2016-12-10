# jquery.confirm.js

This little script adds a modal to body. You need to style (Hide, Transform, Translate, ..) it.
 
## Example

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

## Custom buttons

```
$('.removeButton').confirm({
  custom_buttons: {
    do_something_cool: {
      title: 'Click here',
      link: 'link/to/path',
      target: '_blank',
      keep_modal: 1,
      callback: function(element, buttonSettings, confirmObject) {}
    }
  }
});
```

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
