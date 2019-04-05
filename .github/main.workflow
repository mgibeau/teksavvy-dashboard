workflow "Build & Publish" {
  on = "push"
  resolves = ["Docker push"]
}

action "NPM install" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "install"
}

action "NPM build" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "run build"
  needs = ["NPM install"]
}

action "@master only" {
  uses = "actions/bin/filter@3c98a2679187369a2116d4f311568596d3725740"
  args = "branch master"
  needs = ["NPM build"]
}

action "Docker login" {
  uses = "actions/docker/cli@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  args = "login -u \"$DOCKER_USERNAME\" -p \"$DOCKER_PASSWORD\""
  secrets = ["DOCKER_USERNAME", "DOCKER_PASSWORD"]
  needs = ["@master only"]
}

action "Docker build" {
  uses = "actions/docker/cli@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  args = "build -t maxjbo/teksavvy-dashboard ."
  needs = ["NPM build", "Docker login"]
}

action "Docker push" {
  uses = "actions/docker/cli@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  args = "push maxjbo/teksavvy-dashboard"
  needs = ["Docker build"]
}