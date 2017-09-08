using System;
using System.Collections.Generic;
using System.Linq;

namespace Projects {
    class Program {
        // Converts array to list and runs program
<<<<<<< HEAD
        static void Main (string[] args) {            
            int[] initialSequence = {-2, 8, 1 };
            List<int> sequenceList = new List<int> (initialSequence);
            AlmostSequence (ref sequenceList);
=======
        static void Main(string[] args)
        {
            int i = new int();
            int[] initialSequence = {3, 5, 67, 98, 3};
            List<int> sequenceList = new List<int>(initialSequence);
            Console.WriteLine(AlmostSequence(ref sequenceList, i));
>>>>>>> 90fb23ae0af26faa91954c09e4afb894e42e96a9
        }
        // Checks if items in list or almost Sequence
<<<<<<< HEAD
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
=======
        private static bool AlmostSequence(ref List<int> sequence, int i)       
         {            
            if (IsSequential(ref sequence, out i)) 
            {
                return true;
            } else {
                RemoveItem(ref sequence, i);
                IsSequential(ref sequence, out i);

                if (IsSequential(ref sequence, out i) != true)
                {
                    return false;
                }
            }
            return true;
        }  
        private static bool IsSequential(ref List<int> sequence, out int i)
        {
            for (i = 0; i < sequence.Count - 1; i++)
            {                
                if (sequence[i+1] > sequence[i])
                {
                    continue;
                } else {
                    return false;
                }                  
>>>>>>> 90fb23ae0af26faa91954c09e4afb894e42e96a9
            }
            return true;

<<<<<<< HEAD
        private static List<int> RemoveItem (ref List<int> sequence, int itemAtIndex) {
            return sequence;
        }
    }
}

/* check if list is strictly sequence
   if it is strictly sequence return true
   else if sequence is not true
   remove sequence[i+1] and re-check if sequene is strictly sequence */
=======
        } 
        private static List<int> RemoveItem(ref List<int> sequence, int i)
        {           
            int itemAtIndex = sequence[i+1];
            sequence.Remove(itemAtIndex); 
            return sequence;                   
        }
    }
}
>>>>>>> 90fb23ae0af26faa91954c09e4afb894e42e96a9
