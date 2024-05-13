require 'securerandom'

# Generate a random hex string
secret_key_hex = SecureRandom.hex(64)  # 64 bytes
puts secret_key_hex

# Generate a URL-safe base64 string
secret_key_base64 = SecureRandom.urlsafe_base64(64)  # 64 bytes
puts secret_key_base64
