const cstruct = require('python-struct');
const Buffer = require('buffer').Buffer;
const reads = [
      ['ChunkID', 'uinteger', 4],
      ['ChunkSize','uinteger', 4],
      ['Format', 'uinteger', 4],
      ['Subchunk1ID', 'uinteger', 4],
      ['Subchunk1Size','uinteger',4],
      ['AudioFormat','integer',2],
      ['NumChannels','integer',2],
      ['SampleRate','uinteger',4],
      ['ByteRate','uinteger',4],
      ['BlockAlign','integer',2],
      ['BitsPerSample','integer',2],
      ['Subchunk2ID','uinteger',4],
      ['Subchunk2Size','uinteger', 4],

    ]
function read_wav(buffer){
	return read_wav_queue(buffer)
}
function read_wav_queue(buffer, pointer = 0, i  = 0, read_result = {}){
    var read = reads[i];    
    i++;
    if(read[1]=='string'){
      read_result[read[0]] = buffer.toString('ascii', pointer , pointer + read[2]);
      pointer = pointer + read[2];  
    }
    else if(read[1]=='integer'){

      read_result[read[0]] = buffer.readUInt16LE(pointer, read[2])
      pointer = pointer + read[2];
    }
    else if(read[1]=='uinteger'){

      read_result[read[0]] = buffer.readInt32LE(pointer, read[2])
      pointer = pointer + read[2];
    }
    if(i < reads.length) { return read_wav_queue(buffer, pointer, i, read_result)}
    else { 
      return read_result
    }

}
function write_wav(buffer, read_result, pointer = 0, i = 0){
    var read = reads[i];    
  
    i++;
   if(read[1]=='integer'){
      buffer.writeUInt16LE(read_result[read[0]], pointer)
      pointer = pointer + read[2];
    }
    else if(read[1]=='uinteger'){
      buffer.writeInt32LE(read_result[read[0]], pointer)
      pointer = pointer + read[2];
    }
    if(i < reads.length) { return write_wav(buffer,read_result,  pointer, i)}
    else { 
      return buffer
    }

}
function concat_wav(wavs_input){

    let read_result = read_wav(wavs_input[0]);
    let Subchunk2Size = read_result.Subchunk2Size*wavs_input.length;
    let bufSize = Buffer.alloc(4);
    bufSize.writeInt32LE(Subchunk2Size, 0);
  // console.log('concat_wav',wavs_input.length);
  const bytes_return = Buffer.concat([wavs_input[0].slice(0,40),bufSize, ...wavs_input.map(e=>e.slice(44)) ]);
  return bytes_return;

}

module.exports = {
    audio_write_wav: write_wav,
    audio_read_wav:read_wav,
    audio_concat_wav:concat_wav
}

