const messages = {
	placeholder: 'Hello {name}',
	date: 'Hello {ts, date}',
	time: 'Hello {ts, time}',
	number: 'Hello {num, number}',
	plural: 'I have {num, plural, one {# dog} other {# dogs}}',
	select: 'I am a {gender, select, male {boy} female {girl}}',
	selectordinal: `I am the {order, selectordinal,
        one {#st person}
        two {#nd person}
        =3 {#rd person}
        other {#th person}
    }`,
	richtext: 'I have <bold>{num, plural, one {# dog} other {# dogs}}</bold>',
	richertext:
		'I have & < &nbsp; <bold>{num, plural, one {# & dog} other {# dogs}}</bold>',
	unicode: 'Hello\u0020{placeholder}',
}

export default messages
