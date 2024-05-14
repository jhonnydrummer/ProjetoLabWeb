import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    carrinho: {
      fontSize: '3rem', 
      color: '#ED0066', 
      display: 'block', 
    },
  });
  

const CarrinhoIcone = ({ quantidade }) => {
  const classes = useStyles();

  return (
    <div>
      <ShoppingCartIcon className={classes.carrinho} />
      {quantidade > 0 && <span>{quantidade}</span>}
    </div>
  );
};

export default CarrinhoIcone;
