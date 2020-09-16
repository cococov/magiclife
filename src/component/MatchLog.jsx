import React, { useContext, useEffect, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { GameContext, AppContext } from '../stores';
import { matchLog } from '../styles';
import clsx from 'clsx';

const MatchLog = withStyles(matchLog)(({ classes }) => {
  const { game } = useContext(GameContext);
  const { users } = useContext(AppContext);
  const lastLog = useRef();

  useEffect(() => {
    if (lastLog.current)
      lastLog.current.scrollIntoView({ behavior: "smooth" });
  }, [game.log])

  return (
    <span className={clsx('container-with-scroll', classes.card)} id='gameLog'>
      {game.log.map((line, index) => (
        <p
          key={`LOG-${index}`}
          ref={lastLog}
        >
          {line.split('|').map((value, index, arr) => {
            const color = users.find(user => user.name === arr[1]?.trim())?.color;
            let lineRecomposer = index !== 1 ? <span key={value.toString()}>{value}</span> : <><span key={value.toString()} style={{ color: color, fontWeight: 'bold'}}>{value}</span><span key="corchetin"> | </span></>;
            return lineRecomposer
          })}
        </p>
      ))}
    </span>
  )
});

export default MatchLog;
