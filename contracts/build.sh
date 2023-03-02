cd galaxyminers
cd build
cmake ..
make
cd galaxyminers
cleos wallet open -n galaxyminers &&
cleos wallet unlock -n galaxyminers --password PW5K2iULGmocWa7UeQZArY6FKd6hsDD7sXztKcNSinHK511YJpoJ8
cleos -u https://api.waxsweden.org set contract galaxyminers $(pwd) galaxyminers.wasm galaxyminers.abi