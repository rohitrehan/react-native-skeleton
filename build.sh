#!/bin/bash

trim() {
  local var="$*"
  # Remove leading whitespace characters
  var="${var#"${var%%[![:space:]]*}"}"
  # Remove trailing whitespace characters
  var="${var%"${var##*[![:space:]]}"}"
  echo -n "$var"
}

while IFS='=' read -r key value; do
  if [[ ! $key =~ ^\s*# ]] && [[ $key && $value ]]; then
    key=$(trim "$key")
    value=$(trim "$value")
    export "$key=$value"
  fi
done < build.properties
export EAS_NO_VCS=1
git init
npm install
eas build -p android --local &> build.log
