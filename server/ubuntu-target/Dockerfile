FROM ubuntu:20.04

# Set environment variables
ENV DEBIAN_FRONTEND=noninteractive

# Update and install necessary packages
RUN apt-get update && \
    apt-get install -y \
    curl \
    git \
    python3 \
    python3-pip \
    build-essential \
    sudo \
    && rm -rf /var/lib/apt/lists/*

# Create a user with sudo privileges
RUN useradd -m workshop && \
    echo "workshop:workshop" | chpasswd && \
    adduser workshop sudo

# Copy the vulnerable sudoers file
COPY vulnerable-sudoers /etc/sudoers.d/vulnerable

# Set permissions for the sudoers file
RUN chmod 440 /etc/sudoers.d/vulnerable

# Set the working directory
WORKDIR /home/workshop

# Copy setup script and run it
COPY setup.sh .
RUN chmod +x setup.sh && ./setup.sh

# Switch to the non-root user
USER workshop

# Expose the necessary ports
EXPOSE 3000

# Start the application (this command should be adjusted based on your application)
CMD ["bash"]