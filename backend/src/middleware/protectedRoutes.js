import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protectedRoutes = async ( req, res, next ) => {
    try {

    const token = req.cookies.token || '';

    if ( !token ) {
        return res.status( 401 ).json( { message: 'No token provided' } );
    }

    const decoded = jwt.verify( token, process.env.JWT_SECRET );

    if ( !decoded ) {
        return res.status( 401 ).json( { message: 'Invalid token' } );
    }

    const user = await User.findById( decoded.id ).select( '-password' );

    if ( !user ) {
        return res.status( 401 ).json( { message: 'User not found' } );
    }

    req.user = user;
    next();
    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { message: 'Server Error' } );
    }
}

export default protectedRoutes;