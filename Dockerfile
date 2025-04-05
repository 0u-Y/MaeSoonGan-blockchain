FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
    curl \
    git \
    libssl-dev \
    pkg-config \
    build-essential \
    libudev-dev \
    llvm \
    libclang-dev \
    protobuf-compiler \
    ca-certificates \
    gnupg \
    lsb-release \
    && apt-get clean

#Rust 설치 및 경로 설정
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

ENV PATH="/root/.cargo/bin:${PATH}"


# Solana CLI 설치 및 경로 설정
RUN sh -c "$(curl -sSfL https://release.anza.xyz/stable/install)" && \
    echo 'export PATH="/root/.local/share/solana/install/active_release/bin:$PATH"' >> ~/.bashrc

ENV PATH="/root/.local/share/solana/install/active_release/bin:${PATH}"

#Anchor Version Manager(AVM) 특정 version 설치 및 Anchor CLI 설치
RUN cargo install --git https://github.com/coral-xyz/anchor avm --force && \
    avm install 0.30.1 && \
    avm use 0.30.1

WORKDIR /app

CMD ["bash"]
