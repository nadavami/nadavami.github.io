---
layout: post
title: Curl with SSL for YI Camera 2
---
### Compiling curl with SSL


First we compile mbedtls
…



./configure --host=arm-hisiv300-linux --with-mbedtls=/home/nadav/mbedtls-2.12.0/_install --with-ca-bundle=/etc/ssl/certs/ca-certificates.crt --disable-shared --enable-static --disable-manual --disable-ldap --disable-sspi --without-librtmp --disable-ftp --disable-file --disable-dict --disable-telnet --disable-tftp --disable-rtsp --disable-pop3 --disable-imap --disable-smtp --disable-gopher --disable-smb


export DESTDIR="$PWD/_install/" && make install-strip

make install-strip
Same as make install, then strip debugging symbols. Some users like to trade space for useful bug reports…



References:


https://curl.haxx.se/docs/install.html
https://tls.mbed.org/discussions/generic/mbedtls-build-for-arm
https://tls.mbed.org/kb/how-to/compile-curl-with-mbedtls

