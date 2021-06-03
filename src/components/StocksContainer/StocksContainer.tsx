import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styles from './StocksContainer.module.css';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 5,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


export default function Home() {

  const classes = useStyles();

  const [selectedStocks, setSelectedStocks] = useState([]);

  useEffect(() => {
    fetch(window.location.origin + '/api/cotationsApi?type=stocks')
    .then(res => res.json())
    .then(res => setSelectedStocks(res.data));
  }, []);

  return (
    <div className={styles.container}>
      {selectedStocks.map((element, index) => {
        return(            
            <Card key={index} className={classes.root} variant="outlined">
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  {element.code}
                </Typography>
                <Typography variant="h5" component="h2">
                  {element.name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {element.price}
                </Typography>
                <Typography variant="body2" component="p">
                  {element.variation}
                </Typography>
              </CardContent>
            </Card>
        );
      })}
    </div>
  )
}

