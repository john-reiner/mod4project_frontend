import React, { useState } from 'react';
import { Route } from 'react-router-dom'
import { createStage, checkCollision } from '../gameHelpers';

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from './Styles/StyledTetris';

// Custom Hooks
import { useInterval } from '../hooks/useInterval'
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import NavBar from './NavBar'
import LogIn from './LogIn'
import LeaderBoard from './LeaderBoard'
import SignUp from './SignUp'

let currentUserId = 42069

const Tetris = (props) => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
        rowsCleared
    );

    const movePlayer = dir => {
        if (!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 });
        }
    }

    const startGame = () => {
    // Reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0)
    setLevel(0)
    }

    const drop = () => {

        if (rows > (level + 1) * 10) {
            setLevel(prev => prev + 1);
            setDropTime(1000 / (level + 1) + 200)
        }
        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false })
        } else {
        // Game Over
            if (player.pos.y < 1) {
            setGameOver(true);
            setDropTime(null);
            fetchLevel(level)
            fetchScore(score)
            }
            updatePlayerPos({ x: 0, y: 0, collided: true });
        }
    }

    const keyUp = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 40) {
                setDropTime(1000 / (level + 1) + 200);
            }
        }
    }

    const dropPlayer = () => {
    setDropTime(null)
    drop();
    }

    const move = ({ keyCode }) => {
    if (!gameOver) {
        if (keyCode === 37) {
            movePlayer(-1);
        } else if (keyCode === 39) {
            movePlayer(1);
        } else if (keyCode === 40) {
            dropPlayer();
        } else if (keyCode === 38) {
            playerRotate(stage, 1);
        }
    }
    }

    useInterval(() => {
        drop();
    }, dropTime)

    const fetchLevel = level => {
        fetch('http://localhost:3000/levels', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({number: level})
            
        })
    }

    const fetchScore = score => {
        fetch('http://localhost:3000/scores', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({amount: score})
            
        })
    }
    
    return (
        
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp}>
        <NavBar />
        <Route path="/login" render={() => <LogIn />}/>
        <Route path="/leaderBoard" render={() => <LeaderBoard scores={props.scores}/>}/>
        <Route path="/sign-up" render={() => <SignUp/ >} />
        <Route exact path="/" render={() => 
            <StyledTetris>
            <Stage stage={stage} />
            <aside>
                {gameOver ? (
                <Display gameOver={gameOver} text="Game Over" />
                ) : (
                <div>
                    <Display text={`Score: ${score}`} />
                    <Display text={`Rows: ${rows}`} />
                    <Display text={`Level: ${level}`} />
                </div>
                )}
                <StartButton callback={startGame} />
            </aside>
            </StyledTetris>
        }/>
    </StyledTetrisWrapper>
    );
};

export default Tetris;
