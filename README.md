# jquery.confirm.js
Simple confirmation box
 
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

## Options

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
