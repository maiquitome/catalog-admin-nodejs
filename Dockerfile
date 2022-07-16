FROM node:14.15.4-slim

# usuario do container: o root gera riscos...
# então vamos setar o usuário `node` que já vem dessa imagem...
# execute no terminal: `echo $UID` e verá o retorno 1000 (usuário padrão é 1000)
USER node

# mesmo do volume no docker-compose
WORKDIR /home/node/app

# CMD [ "tail", "-f", "/dev/null" ]
CMD [ "sh", "-c", "npm i && tail -f /dev/null" ]