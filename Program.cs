using System;
using System.Collections.Generic;
using System.Linq;

namespace Projects {
    class Program {
        // Converts array to list and runs program
        static void Main (string[] args) {            
            int[] initialSequence = {-2, 8, 1 };
            List<int> sequenceList = new List<int> (initialSequence);
            AlmostSequence (ref sequenceList);
        }

        // Checks if items in list or almost Sequence
        private static bool AlmostSequence (ref List<int> sequence, int itemAtindex) {

            if (IsSequence (ref sequence) == true) {
                return true;
            } else {
                
            }
            return true;
        }

        // Compares each item in the list. If b > a and returns false if b < a 
        private static bool IsSequence (ref List<int> sequence) {
            int itemAtIndex = new int();
            for (int i = 0; i < sequence.Count - 1; i++) {
                if (sequence[i + 1] > sequence[i]) {
                    continue;
                } else {

                    itemAtIndex = sequence[i + 1];
                    RemoveItem (ref sequence, itemAtIndex);
                    return false;
                }
            }
            return true;
        }

        private static List<int> RemoveItem (ref List<int> sequence, int itemAtIndex) {
            return sequence;
        }
    }
}

/* check if list is strictly sequence
   if it is strictly sequence return true
   else if sequence is not true
   remove sequence[i+1] and re-check if sequene is strictly sequence */