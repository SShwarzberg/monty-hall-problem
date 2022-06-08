import './Home.css'
import imgX from './images/x.png'
import imgCheck from './images/check.png'
import { useEffect, useRef, useState } from 'react'

const Home = () => {
    const image = useRef()
    const boxId = useRef([])
    const wrapper = useRef([])

    const imgArray = [imgX, imgX, imgCheck]
    const [randomImgArray] = useState(imgArray
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value))
    const [boxClicked, setBoxClicked] = useState(false)
    const [revealedBox, setRevealedBox] = useState(false)
    const [altChoice, setAltChoice] = useState(false)
    const [playAgain, setPlayAgain] = useState(false)
    const [message, setMessage] = useState(null)




    let array = []
    for (let i = 0; i < 3; i++) {
        const id = i + 1
        const imgLinkNumber = randomImgArray[i]
        const object = {
            box: {
                "id": id,
                "imgLink": imgLinkNumber
            }
        }
        array.push(object)
    }

    const revealOne = (e) => {
        const filteredArray = wrapper.current.filter(item => item.id !== e.target.parentNode.parentNode.id)
        if (filteredArray[0].lastChild.firstChild.src.includes('2XAFnOGz1eT6W6')) {
            if (e.target.parentNode.classList[0] === 'see-through-box' || e.target.parentNode.classList[1] === 'see-through-box') {
                return
            } else {
                filteredArray[1].lastChild.classList.add('see-through-box')
                setRevealedBox(filteredArray[1].id)
                setAltChoice(filteredArray[0].id)
            }
        } else {
            if (e.target.parentNode.classList[0] === 'see-through-box' || e.target.parentNode.classList[1] === 'see-through-box') {
                return
            } else {
                filteredArray[0].lastChild.classList.add('see-through-box')
                setRevealedBox(filteredArray[0].id)
                setAltChoice(filteredArray[1].id)
            }
        }
        boxId.current.forEach(item => {
            if (e.target.parentNode.parentNode.id === item.id) {
                item.style.fontWeight = '700'
            }
        })
        setBoxClicked(e.target.parentNode.parentNode.id)
    }

    const revealAllStick = () => {
        setPlayAgain(true)
        if (wrapper.current[boxClicked - 1].lastChild.lastChild.src.includes('2XAFnOGz1eT6W6')) {
            wrapper.current[boxClicked - 1].firstChild.style.color = 'green'
            setMessage(`You stuck with your original pick of box ${boxClicked} and win!`)
            wrapper.current.forEach(item => {
                item.lastChild.classList.add('see-through-box')
            })
        } else if (!wrapper.current[boxClicked - 1].lastChild.lastChild.src.includes('2XAFnOGz1eT6W6')) {
            wrapper.current[boxClicked - 1].firstChild.style.color = 'red'
            setMessage(`You stuck with your original pick of box ${boxClicked} and lose!`)
            wrapper.current.forEach(item => {
                item.lastChild.classList.add('see-through-box')
            })
        }
    }

    const revealAllSwitch = () => {
        setPlayAgain(true)
        if (wrapper.current[boxClicked - 1].lastChild.lastChild.src.includes('2XAFnOGz1eT6W6')) {
            wrapper.current[altChoice - 1].firstChild.style.color = 'red'
            setMessage(`You you switched from your original pick to box ${altChoice} and lose!`)
            wrapper.current.forEach(item => {
                item.lastChild.classList.add('see-through-box')
            })
        } else if (!wrapper.current[boxClicked - 1].lastChild.lastChild.src.includes('2XAFnOGz1eT6W6')) {
            wrapper.current[altChoice - 1].firstChild.style.color = 'green'
            setMessage(`You you switched from your original pick to box ${altChoice} and win!`)
            wrapper.current.forEach(item => {
                item.lastChild.classList.add('see-through-box')
            })
        }
    }

    return (
        <div className="Home">
            <div className="canvas">
                {array.map(photoObject => (
                    <div ref={(e) => { wrapper.current.push(e) }} className="individual-box-wrapper" id={photoObject.box.id} key={photoObject.box.id}>
                        <div className='id-displayed' id={photoObject.box.id} ref={(e) => boxId.current.push(e)}>{photoObject.box.id}</div>
                        <div className="individual-box" onClick={(e) => {
                            revealOne(e)
                        }}>
                            <img ref={image} src={photoObject.box.imgLink} alt="" />
                        </div>
                    </div>
                ))}
            </div>
            {!playAgain && boxClicked &&
                <div className='message-container'>
                    <div>You clicked on box number <b>{boxClicked}</b>. Box number <b>{revealedBox}</b> has been revealed for you. </div>
                    <p>Would you like to keep your current pick? Or would you like to switch your answer now?</p>
                    <div className="btn-container">
                        <button className='keep-btn' onClick={() => {
                            revealAllStick()
                        }}>Stick with box&nbsp;<b>{boxClicked}</b></button>
                        <button className='switch-btn' onClick={() => {
                            revealAllSwitch()
                        }}>Switch to box number {altChoice}</button>
                    </div>
                </div>}
            {playAgain &&
                <div className='play-again-wrapper'>
                    <div className='final-message'>{message}</div>
                    <button className='play-again' onClick={() => window.location.reload()}>Play Again</button>
                </div>
            }
        </div>
    );
}

export default Home;
