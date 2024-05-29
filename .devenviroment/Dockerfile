FROM node:20-bookworm-slim

USER root

RUN apt update && \
    apt upgrade -y && \
    apt install git procps -y

WORKDIR /app

RUN ssh-keygen -t ed25519 -C "paolo.dev.project@gmail.com" -N "" -f /root/.ssh/id_ed25519

RUN cat /root/.ssh/id_ed25519.pub >> /root/.ssh/authorized_keys

RUN git config --global user.name "paolochmprojects"

RUN git config --global user.email "paolo.dev.project@gmail.com"

EXPOSE 3000