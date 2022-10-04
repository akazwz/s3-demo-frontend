import { Button, Flex, Image } from '@chakra-ui/react'
import { ChangeEvent, useRef, useState } from 'react'

const Index = () => {
	const [imgSrc, setImgSrc] = useState('')

	const fileInputRef = useRef<HTMLInputElement>(null)
	const handleClickUpload = () => {
		fileInputRef.current?.click()
	}

	const handleFileOnChange = async(event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault()
		const file = event.currentTarget?.files?.item(0)
		if (!file) return
		const key = file.name
		// get presigned url
		const res = await fetch(`http://localhost:8080/s3/${key}/upload`)
		if (!res.ok) {
			return
		}
		const { url, method } = await res.json()
		// put object
		const putRes = await fetch(url, {
			method,
			body: file,
			mode: 'cors',
		})

		if (!putRes.ok) {
			return
		}

		const getRes = await fetch(`http://localhost:8080/s3/${key}`)
		const { url: imageSrc } = await getRes.json()
		setImgSrc(imageSrc)
	}
	return (
		<Flex
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
			height="100vh"
			gap={10}
		>
			<Button onClick={handleClickUpload}>Upload</Button>
			<input ref={fileInputRef} hidden type="file" onChange={handleFileOnChange} />
			<Image src={imgSrc} alt="image" height="300px" />
		</Flex>
	)
}

export default Index