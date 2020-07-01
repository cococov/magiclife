import React, { useContext, useEffect, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { GameContext } from '../stores';
import { matchLog } from '../styles';
import clsx from 'clsx';

const MatchLog = withStyles(matchLog)(({ classes }) => {
  const { game } = useContext(GameContext);
  const lastLog = useRef();

  useEffect(() => {
    if (lastLog.current)
      lastLog.current.scrollIntoView({ behavior: "smooth" });
  }, [game.log])

  return (
    <span className={clsx('container-with-scroll', classes.card)}>
      {game.log.map((line, index) => (
        <p
          key={`LOG-${index}`}
          ref={lastLog}
        >
          {line}
        </p>
      ))}
    </span>
  )
});

export default MatchLog;
