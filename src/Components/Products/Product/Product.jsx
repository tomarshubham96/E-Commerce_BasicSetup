import React from 'react';
import { Card, CardActions, CardMedia, CardContent, Typography, IconButton, Tooltip } from '@material-ui/core';
import { AddShoppingCart, BookmarkBorderOutlined } from '@material-ui/icons';
import useStyles from './productStyles';

const Product = ({ product }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={product.image}
                title={product.name}
            />
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h5">
                        {product.currSymbol + product.price}
                    </Typography>
                </div>
                <Typography variant="body2" color="primary">
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton
                    aria-label="Wishlist Item"
                >
                    <Tooltip title="Wishlist Item">
                        <BookmarkBorderOutlined />
                    </Tooltip>
                </IconButton>
                <IconButton
                    aria-label="Add to Cart"
                >
                    <Tooltip title="Add to Cart">
                        <AddShoppingCart />
                    </Tooltip>
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product;
