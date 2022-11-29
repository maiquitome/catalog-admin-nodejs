FROM node:14.17.0-slim

RUN mkdir -p /usr/share/man/man1 && \
    echo 'deb http://ftp.debian.org/debian stretch-backports main' | tee /etc/apt/sources.list.d/stretch-backports.list && \
    apt update && apt install -y \
    git \
    ca-certificates \
    openssh-client \
    curl \
    zsh \
    openjdk-11-jre
    
RUN apt-get install gnupg2 -y

ENV JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64"

# usuario do container: o root gera riscos...
# então vamos setar o usuário `node` que já vem dessa imagem...
# execute no terminal: `echo $UID` e verá o retorno 1000 (usuário padrão é 1000)
USER node

# mesmo do volume no docker-compose
WORKDIR /home/node/app

# ZSH PLUGINS
RUN git clone https://github.com/zsh-users/zsh-autosuggestions ~/.zsh/zsh-autosuggestions && \
    echo 'source ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh' >> ~/.zshrc

RUN git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ~/.zsh/zsh-syntax-highlighting && \
    echo 'source ~/.zsh/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh' >> ~/.zshrc

RUN git clone https://github.com/zsh-users/zsh-completions.git ~/.zsh/zsh-completions && \
    echo 'source ~/.zsh/zsh-completions/zsh-completions.plugin.zsh' >> ~/.zshrc

# ZSH THEME INSTALL
RUN curl -O https://starship.rs/install.sh && \
    chmod +x install.sh && \
    mkdir ~/bin && \
    ./install.sh -b ~/bin -y && \
    echo 'eval "$(starship init zsh)"' >> ~/.zshrc

# ZSH THEME CONFIG
RUN mkdir ~/.config && \ 
    touch starship.toml && \
    echo '[package]'                                    >> ~/.config/starship.toml && \
    echo 'disabled = true'                              >> ~/.config/starship.toml && \
    echo '[nodejs]'                                     >> ~/.config/starship.toml && \
    echo 'format = "via [NodeJS $version]($style)"'     >> ~/.config/starship.toml
    
# ZSH HISTORY
RUN echo 'HISTSIZE=1000' >> ~/.zshrc 
RUN echo 'SAVEHIST=1000' >> ~/.zshrc 
RUN echo 'HISTFILE=/home/node/zsh/.zsh_history' >> ~/.zshrc

# FIX CTRL + ARROW
RUN echo "bindkey '^[[1;5D' backward-word" >> ~/.zshrc && \
    echo "bindkey '^[[1;5C' forward-word" >> ~/.zshrc

# CMD [ "tail", "-f", "/dev/null" ]
CMD [ "sh", "-c", "npm i && tail -f /dev/null" ]