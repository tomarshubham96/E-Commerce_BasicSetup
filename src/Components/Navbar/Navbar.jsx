import React, { useRef, useState, useEffect } from 'react';
import { AppBar,
         Toolbar,
         IconButton,
         Badge, 
         MenuItem, 
         Menu, 
         Typography, 
         Popper, 
         Grow, 
         Paper,
         ClickAwayListener, 
         MenuList,
         Button
        } from '@material-ui/core';
import { ShoppingCart, } from '@material-ui/icons';
import useStyles from './navBarStyles';
import logo from '../../images/logo.png';

const Navbar = ({ handlePriceConversion }) => {
    const classes = useStyles();
    const [openMenu, setOpenMenu] = useState(false);
    const [selectedcurrency, setSelectedCurrency] = useState(1);
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpenMenu((prevOpen) => !prevOpen);
    };

    const handleCloseMenu = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpenMenu(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpenMenu(false);
        }
    }

    const prevOpen = React.useRef(openMenu);
    useEffect(() => {
        if (prevOpen.current === true && openMenu === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = openMenu;
    }, [openMenu]);

    const handleClick = (event) => {
        
        switch (event.target.id) {
            case 'INR':               
                setSelectedCurrency(0);
                handlePriceConversion('INR');
                break;
            case 'USD':                
                setSelectedCurrency(1);
                handlePriceConversion('USD');  
                break;      
            default:
                break;
        }
        setOpenMenu(false);
    };

    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Shop App" height="25px" className={classes.image} />
                    Feature Store
                </Typography>
                    <div className={classes.grow} />
                    <div>
                        <Button
                            aria-label="Set Currency"
                            color="inherit"
                            size="small"
                            ref={anchorRef}
                            onClick={handleToggle}
                        >
                            Currency
                    </Button>
                        <Popper open={openMenu} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={handleCloseMenu}>
                                            <MenuList autoFocusItem={openMenu} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                                <MenuItem id="INR" selected={selectedcurrency===0} onClick={handleClick}>INR</MenuItem>
                                                <MenuItem id="USD" selected={selectedcurrency===1} onClick={handleClick}>USD</MenuItem>
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </div>
                    <div className={classes.button}>
                        <IconButton aria-label="Show Cart Items" color="inherit">
                            <Badge badgeContent={0} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar;
