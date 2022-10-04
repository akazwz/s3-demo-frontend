import {extendTheme} from "@chakra-ui/react";

const theme = extendTheme({
	tokens: {
		colors: {
			'body-bg': {
				default: 'white',
				_dark: 'black',
			},
			'body-color': {
				default: 'black',
				_dark: 'white',
			},
		},
	},
	styles: {
		global: {
			body: {
				bg: 'body-bg',
				color: 'body-color',
			},
		},
	},
})

export default theme