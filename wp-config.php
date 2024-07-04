<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost:8111' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );


/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         ':J?#F@nH4jq3>}M8&<OvVvR5xIgLcGhtaqi2AgsUe.EMVK0*w[r/h^Ct@Hv3Dq}`' );
define( 'SECURE_AUTH_KEY',  'R0TEPx{3RXw@&SE$^w07A._:)Ye]eP{~@F?nabT<~r>6TD=8t;FwMuE^j^Sx|{RT' );
define( 'LOGGED_IN_KEY',    'D0aCx;E<$DawIF13n#xduFqt13hE#[][%LB`.N Wu$l=t}yjHWy2oD5:,qWdXwN|' );
define( 'NONCE_KEY',        'T.$Nlwo?TKp&N1SOXmCE%v0|#`Y<.9yL<w!t:Lk}zAV1dlq_&<reCD>w`]s&qKy*' );
define( 'AUTH_SALT',        ']S=fMRdcvser%mGks3G@$Nm]t)}|cv&oqU870S)R!^LK@Oge.7ON+;;U:NVn9)<i' );
define( 'SECURE_AUTH_SALT', '[50U@A!0${ewkh9|S[%l3U_3;5f`Qy*pg[%/8aUHU%X[.5Y;-;SFg^hU0u#7HsL ' );
define( 'LOGGED_IN_SALT',   '0~/_jhp`+<P%7gJ%8FcWI.G&pd&8y<BepPDn-+*g;QEZjas2NMYCi&bgiwL.xMyR' );
define( 'NONCE_SALT',       'W+wYo#5~&?qxe6=;R25<uXF+L&UwpCL?Q^,NAAWX;7qUf/<&Oy?zweT(h$=R3UeS' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
