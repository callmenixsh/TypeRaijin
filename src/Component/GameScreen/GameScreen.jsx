import React from 'react'
import './GameScreen.css'
import Settings from './Settings'


const GameScreen = () => {
    return (
        <div>
            <div className='boddy'>

                <div className='gameUI'>
                    <div className='tabList'>
                        <div className="titleBar"><img src="logo.png"></img>TypeRAIJIN</div>
                        <div className="timer">00:00</div>
                        <div className="leaderBoard">

                            <div className="leaderLabel">LEADERBOARD</div>

                            <div className='playerList'>
                                <div className="player1 playerT">Yellow</div>
                                <div className="player2 playerS">Red</div>
                                <div className="player3 playerS">Orange</div>
                                <div className="player4 playerS">Pink</div>
                            </div>
                        </div>
                    </div>
                    <div className="wordPanel">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe harum fugit quae autem nisi incidunt? Cupiditate minus perspiciatiseritatis similique quos quam pariatur error sit id iste reiciendis earum numquam. Cumque enim in perspiciatis commodi ducimus? Reprehenderit, labore totam quisquam itaque nam repellendus aperiam soluta, laboriosam officiis, blanditiis consectetur.</div>
                </div>

                <input className="typingPanel" spellcheck="false" maxlength="10" />

                <div className="menuBar">
                    <Settings />
                    <div className="quitR">QUIT</div>
                </div>
            </div>
        </div>
    )
}

export default GameScreen